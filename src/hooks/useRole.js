import axios from 'axios'
import { useEffect, useState } from 'react'

const useRole = (user) => {
	const [role, setRole] = useState("")
	const [roleLoading, setRoleLoading] = useState(true)
	// console.log(role);
	useEffect(() => {
		if (user) {
			axios
				.get(
					`http://localhost:5000/api/v1/singleUserByEmail/${user?.email}`
				)
				.then(data => {
					// console.log(data.data);
					setRole(data?.data?.role)
					setRoleLoading(false)
				})
		}
		else{
			setRoleLoading(true)
		}

	}, [user])

	return [role, roleLoading]
}
export default useRole;
