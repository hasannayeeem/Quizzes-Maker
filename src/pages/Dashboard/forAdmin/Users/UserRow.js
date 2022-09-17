import React from "react";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';
import swal from "sweetalert";
import useUsers from "../../../../hooks/useUsers";
import { FaTrashAlt } from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";

const UserRow = ({ user, index }) => {
  const { _id, email, name, role, isPaid } = user;
  const handleDelete = (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        fetch(`https://quizzes-maker.herokuapp.com/api/v1/user/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            if (data.message) {
              swal("Your file has been deleted!", {
                icon: "success",
              });
              //   refetch();
            }
          });
      }
    });
  };

  const makeAdmin = () => {
    const userData = {
      role: "admin",
    };
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
      
    }).then((willDelete) => {
      if (willDelete) {
        fetch(`https://quizzes-maker.herokuapp.com/api/v1/user?email=${user.email}`, {
          method: "PUT",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(userData),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            toast.success(`${name ? name : "this user"} Successfully made an admin`);
          });
      }
    });
  };

  const deleteAdmin = () => {
    const userData = {
      role: "",
    };

    Swal
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        background: '#343a40',
        color: 'yellow',
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete from admin!",
      })
      .then((result) => {
        if (result.isConfirmed) {
          axios
            .put(
              `https://quizzes-maker.herokuapp.com/api/v1/user?email=${user.email}`,
              userData
            )
            .then((data) => {
              Swal.fire(
                "Deleted!",
                `${user.email} has been Deleted from admin.`,
                "success"
              );
              // refetch()
            })
            .catch((error) => {
              console.log(error.response.data);
              if (error.response.status === 403) {
                toast.error("You are Not Admin");
              }
            });
        }
      });
  };
  return (
    <tr className="bg-gray-800 border-gray-700 odd:bg-gray-800 even:bg-gray-700">
      <th
        scope="row"
        className={`text-white px-3 sm:pr-0 sm:pl-8 py-2  sm:py-4 font-medium  whitespace-nowrap text-[13px]`}
      >
        {index + 1}
      </th>
      <td className="py-2 text-[11px] sm:text-[13px] sm:py-4">{name}</td>
      <td className="py-2 text-[11px] sm:text-[13px] sm:py-4">{email}</td>
      <td className="py-2 text-[13px] sm:py-4 text-center">
        <p className="btn btn-xs btn-ghost duration-200">
          {isPaid ? "Premium" : "Free"}
        </p>
      </td>
      <td className="py-2 text-[13px] sm:py-4 text-center">
        {user?.role === "admin" ? (
          <button
            onClick={deleteAdmin}
            className={`hover:text-white hover:btn-ghost btn btn-xs  btn-warning`}
          >
            Delete Admin
          </button>
        ) : (
          <button
            onClick={makeAdmin}
            className={`hover:text-white hover:btn-ghost btn btn-xs  btn-success`}
          >
            Make Admin
          </button>
        )}
      </td>

      <td className="py-2 text-[13px] sm:py-4 text-center">
        <div className="flex items-center justify-center">
        <Link
          className="btn btn-xs btn-ghost duration-200"
          to={`/user/${user._id}`}
        >
          Details
          
        </Link><FaTrashAlt
            onClick={() => handleDelete(_id)}
            className="text-secondary ml-2 cursor-pointer"
          ></FaTrashAlt>
        </div>
      </td>
    </tr>
  );
};

export default UserRow;
