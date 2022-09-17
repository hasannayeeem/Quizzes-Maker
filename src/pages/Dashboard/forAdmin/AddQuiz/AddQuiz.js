import { Checkbox } from 'antd';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

const AddQuiz = () => {
    const [questionForm, setQuestionForm] = useState(false);
  const [quizName, setQuizName] = useState("");
  const [image, setImage] = useState("");
  const [picurl, setPicurl] = useState("");
  const [description, setDescription] = useState("");
  const [quizType, setQuizType] = useState("free");
  const [timeType, setTimeType] = useState("quiz wise");
  const [resultType, setResultType] = useState("per quiz");
  const [retake, setRetake] = useState("");
  const [time, setTime] = useState("");
  const [questionList, setQuestionList] = useState([]);
  const [question, setQuestion] = useState("");
  const [option, setOption] = useState("");
  const [index, setIndex] = useState(1);
  const [optionList, setOptionList] = useState([]);
  const [answer, setAnswer] = useState([]);
  const [message, setMessage] = useState("");

  const uploadImageAndgetUrl = (data) => {
    if (image !== "" && image !== undefined) {
      const format = image.name.split(".");
      if (format[1] === "png" || format[1] === "jpg" || format[1] === "jpeg") {
        const imgData = new FormData();
        imgData.append("file", image);
        imgData.append("upload_preset", "heroku-upload-practice");
        imgData.append("cloud_name", "doctog5my");
        fetch(`https://api.cloudinary.com/v1_1/doctog5my/image/upload`, {
          method: "post",
          body: imgData,
        })
          .then((res) => res.json())
          .then((imgData) => {
            setPicurl(imgData.url);
            setMessage("");
          })
          .catch((err) => {
            // console.log(err);
          });
      }
    } else {
      setMessage("Please Enter A Valid Cover Image");
    }
  };


  const optionAddHandler = () => {
    const optionObj = {
      id: index,
      option: option,
    };
    setOptionList([...optionList, optionObj]);
    setOption("");
  };

  const onChange = (checkedValues) => {
    setAnswer(checkedValues);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    // console.log("submit");
    // console.log(question);
    // console.log(optionList);
    // console.log(answer);
    const questionDemo = {
      question,
      options: optionList,
      answer,
    };
    setQuestionList([...questionList, questionDemo]);
    const url = `https://quizzes-maker.herokuapp.com/api/v1/createQuestionDemo`;
    fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(questionDemo),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        toast("added question successfully");
      });
    console.log(questionDemo);
    setQuestion("");
    setAnswer([]);
    setOptionList([]);
    setIndex(1);
    // console.log(question);
  };


  const fixStr = (str) => {
    console.log(str);
    let s = str.join(",");
    return s;
  };


  const totalQuizSubmitHandler = (e) => {
    e.preventDefault();
    setQuestionForm(false);
    setQuestionList([]);
    // dispatch(quizCreatedSuccessfully());
  };


  const quizDemoHandler = (e) => {
    e.preventDefault();
    const quizDemo = {
      quizName,
      image: picurl,
      description,
      quizType: quizType,
      resultType: resultType,
      timeType: timeType,
      retakeCount: retake,
      allQTime: time,
    };
    const url = `https://quizzes-maker.herokuapp.com/api/v1/createQuizDemo`;
    fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(quizDemo),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        toast("added quiz successfully Please write some question");
      });
    setQuestionForm(true);
    setQuizName("");
    setPicurl("");
    setDescription("");
    setQuizType("free");
    setRetake("");
    setTime("");
  };
    return (
        <div className="relative">
      <h1 className='text-xl font-semibold text-left ml-12 mb-4 text-secondary mt-4'>{questionForm ? 'Add Question' : 'Add Quiz'}</h1>
      <div className="hero bg-p w-1/2 ml-12 rounded-sm mb-12">
        <div className="py-4">
          <form className="mt-2">
            {questionForm === false ? 
            (
              <>
                <div className="">
                  <div className="my-2 text-white">{message && message}</div>
                  <input
                    type="text"
                    className="input text-gray-200 input-bordered glass input-secondary w-full max-w-xs"
                    placeholder="Enter Quiz Name"
                    value={quizName}
                    onChange={(e) => setQuizName(e.target.value)}
                  />
                </div>
                <div className="">
                  <input
                    type="file"
                    placeholder="select photo"
                    className='input text-gray-300 input-bordered glass input-secondary w-full max-w-xs my-2'
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                </div>
                <div className="form-group">
                  <textarea
                    type="text"
                    className="textarea text-gray-300 textarea-secondary w-full glass max-w-xs"
                    placeholder="Enter A Quiz Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    onClick={uploadImageAndgetUrl}
                  />
                </div>
                <div className="input  input-bordered glass input-secondary w-full max-w-xs">
                  
                  <select
                    value={quizType}
                    onChange={(e) => setQuizType(e.target.value)}
                    className='mr-2 -mt-4'
                  >
                    <option value="free" className='bg-secondary py-1 text-gray-300 input-bordered glass input-secondary w-full max-w-xs'>Free</option>
                    <option value="paid" className='bg-secondary py-1 text-gray-300 input-bordered glass input-secondary w-full max-w-xs'>Paid</option>
                  </select>
                  <select
                    value={resultType}
                    onChange={(e) => setResultType(e.target.value)}
                    className='mr-2 -mt-4'
                  >
                    <option value="free" className='bg-secondary py-1 text-gray-300 input-bordered glass input-secondary w-full max-w-xs'>quiz wise</option>
                    <option value="paid" className='bg-secondary py-1 text-gray-300 input-bordered glass input-secondary w-full max-w-xs'>Question wise</option>
                  </select>
                  <select
                    value={timeType}
                    onChange={(e) => setTimeType(e.target.value)}
                    
                  >
                    <option value="free" className='bg-secondary py-1 text-gray-300 input-bordered glass input-secondary w-full max-w-xs'>per quiz</option>
                    <option value="paid" className='bg-secondary py-1 text-gray-300 input-bordered glass input-secondary w-full max-w-xs'>per question</option>
                  </select>
                  <p className='text-xs mb-1 text-gray-300'>quiz^type     <span className='mx-8'>result^type</span>     time^type</p>
                </div>
                <div className="form-group">
                  <input
                    type="number"
                    placeholder="Choose Retake Count"
                    value={retake}
                    onChange={(e) => setRetake(e.target.value)}
                    className="input my-2 text-gray-300 input-bordered glass input-secondary w-full max-w-xs"
                  />
                </div>
                <div className="">
                  <input
                    type="number"
                    placeholder="Set Quiz Duration"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="input text-gray-300 input-bordered glass input-secondary w-full max-w-xs"
                  />
                </div>
                <div className="">
                  <button
                    onClick={(e) => {
                      quizDemoHandler(e);
                    }}
                    type="button"
                    className="btn my-2 btn-primary bg-secondary input-bordered input-secondary w-full max-w-xs"
                    disabled={
                      !quizName ||
                      !image ||
                      !description ||
                      !quizType ||
                      !retake ||
                      !time
                    }
                  >
                    Add Quiz
                  </button>
                </div>
              </>
            ) 
            : 
            (
              <>
                <div className="my-6">
                  <div className="">
                    <input
                      type="text"
                      className="input my-2 text-gray-300 input-bordered glass input-secondary w-full max-w-xs"
                      placeholder="Enter Your Question"
                      value={question}
                      onChange={(e) => setQuestion(e.target.value)}
                    />
                  </div>
                  <div className="text-2xl my-3 text-slate-400">Question : {question} ?</div>
                  <Checkbox.Group onChange={onChange}>
                    <div className="my-3">
                      {optionList.map((opt, idx) => (
                        <div key={idx} className="flex items-center">
                          <Checkbox value={opt.id} className="text-xl text-slate-400">
                            <span className=" -mt-1 ml-2">{opt.option}</span>
                          </Checkbox>
                        </div>
                      ))}
                    </div>
                  </Checkbox.Group>
                  {answer.length === 0 && (
                    <div className="">
                      <input
                        type="text"
                        className="input mt-2 mb-4 text-gray-300 input-bordered glass input-secondary w-full max-w-xs"
                        placeholder="Enter options for this question"
                        value={option}
                        onChange={(e) => setOption(e.target.value)}
                      />
                    </div>
                  )}

                  {answer.length === 0 ? (
                    <button
                      type="button"
                      onClick={() => {
                        optionAddHandler();
                        setIndex(index + 1);
                      }}
                      className="btn btn-primary bg-secondary w-full max-w-xs"
                      disabled={!question}
                    >
                      Add option
                    </button>
                  ) : (
                    <div className="form-group">
                      <button
                        type="button"
                        onClick={submitHandler}
                        className="btn btn-primary bg-secondary w-full max-w-xs mb-2"
                      >
                        Save Answer
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}
          </form>
        </div>
      </div>
      <div className="text-white hidden lg:block md:block bg-p fixed p-4 max-h-screen top-20 right-0 overflow-y-auto w-96 mt-4 pb-8">
        {questionForm === true && (
          <>
            <div className="">
              {questionList.length !== 0 && (
                <div className="text-lg text-secondary">Review Your Questions</div>
              )}
              {questionList.map((ql, idx) => (
                <div key={idx} className="mt-3 mb-1">
                  <div className="">
                    <div className="text-xl text-blue-300">Question Num : {idx + 1}</div>
                    <div className="text-xl">{ql.question}</div>
                  </div>
                  <div>
                    <div>Options : </div>
                    {ql.options.map((op, idx) => (
                      <div key={idx}>
                        <div className="text-xl">
                          {idx + 1} : {op.option}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div>
                    <div className="font-bold">
                      Answer Is Option : {fixStr(ql.answer)}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bottom-0 w-full fixed">
              {questionList.length !== 0 && (
                <button
                  onClick={totalQuizSubmitHandler}
                  className="btn btn-primary bg-secondary w-full max-w-xs mt-5"
                >
                  Submit Total Quiz
                </button>
              )}
            </div>
            <div className="bottom-0 lg-hidden md-hidden w-full fixed">
              {questionList.length !== 0 && (
                <button
                  onClick={totalQuizSubmitHandler}
                  className="btn btn-primary bg-secondary w-full max-w-xs mt-5"
                >
                  Submit Total Quiz
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
    );
};

export default AddQuiz;