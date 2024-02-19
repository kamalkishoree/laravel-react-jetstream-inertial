import { React, useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import $ from 'jquery';
import Select from "react-select";


export default function Dashboard(props) {

	const { subjects } = props;
	const { data, setData, errors, post } = useForm({
		name: "",
		age: "",
		sex: "",
		class: "",
		roll_no: "",
		teacher_id: "",
		subject_id: "",
	});

	const classOptions = [
		{ value: "I", label: "I" },
		{ value: "II", label: "II" },
		{ value: "III", label: "III" },
		{ value: "IV", label: "IV" },
		{ value: "V", label: "V" },
		{ value: "VI", label: "VI" },
		{ value: "VII", label: "VII" },
		{ value: "VIII", label: "VIII" },
		{ value: "IX", label: "IX" },
		{ value: "X", label: "X" },
		{ value: "XI", label: "XI" },
		{ value: "XII", label: "XII" },
	];
	const sexOptions = [
		{ value: "Male", label: "male" },
		{ value: "Female", label: "Female" },
		{ value: "Other", label: "Other" },
	];

	const [studentName, setStudentName] = useState("");
	const [StduentRoleNo, setStduentRoleNo] = useState([]);
	const [StduentAge, setStduentAge] = useState("");
	const [selectedClass, setselectedClass] = useState("");
	const [selectedTeachers, setSelectedTeachers] = useState([]);
	const [selectedSubject, setselectedSubject] = useState([]);
	const [SelectedSex, setSelectSex] = useState("");
	const [validationError, setValidationError] = useState({});
	const [teacherData, setTeacherData] = useState([]);
	const [subjectData, setSubjectData] = useState([]);

	const handleSelectedClass = (selectedClass) => {
		const newSelectedClass = selectedClass.value;
		console.log(newSelectedClass);
		setselectedClass(newSelectedClass);
		setData("class", newSelectedClass);


	};

	const handleChangeSex = (SelectedSex) => {
		const newSex = SelectedSex;
		setSelectSex(newSex);
		setData("sex", newSex.value);

	};


	const SubjectOptions = subjects.map(({ id, name }) => ({
		value: id,
		label: name,
	}));
	console.log(selectedSubject);
	const all_subject = selectedSubject.map((item) => item.value);
	
	const handleSelectedSubject = (e) => {
		const newSubject = e;
		setselectedSubject(newSubject);
		setData("subject_id",all_subject)
	};

	const handleSelectedTeachers = (selectedteachers) => {
		const newTeacher = selectedteachers;
		setSelectedTeachers(newTeacher);
	};

	function handleSubmit(e) {
		e.preventDefault();
		post(route("student.store"));
	}

	return (
		<AuthenticatedLayout auth={props.auth} user={props.auth.user} errors={props.errors} header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Add Student</h2>}>
			<Head title="Posts" />
			<div className="py-12">
				<div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
					<div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
						<div className="p-6 bg-white border-b border-gray-200">
							<div className="flex items-center justify-between mb-6">
								<Link className="px-6 py-2 text-white bg-blue-500 rounded-md focus:outline-none" href={route("subject.index")}>Back</Link>


							</div>

							<form name="createForm" onSubmit={handleSubmit}>
								<div className="flex flex-col">
									<div className="mb-4">
										<label className="">Name</label>
										<input type="text" className="w-full px-4 py-2" label="Name" name="name" value={data.name} onChange={(e) => setData("name", e.target.value)} />
										<span className="text-red-600">
											{errors.name}
										</span>
									</div>

									<div className="flex flex-col">
										<div className="mb-4">
											<label className="">Roll No.</label>
											<input type="number" className="w-full px-4 py-2" label="roll_no" name="name" value={data.roll_no} onChange={(e) => setData("roll_no", e.target.value)} />
											<span className="text-red-600">
												{errors.roll_no}
											</span>
										</div>
									</div>

									<div className="flex flex-col">
										<div className="mb-4">
											<label className="">Age</label>
											<input type="number" className="w-full px-4 py-2" label="age" name="age" value={data.age} onChange={(e) => setData("age", e.target.value)} />
											<span className="text-red-600">
												{errors.age}
											</span>
										</div>
									</div>


									<div className="mb-0">
										<label className="">Sex</label>

										<Select name="sex"
											options={sexOptions}
											value={SelectedSex}
											onChange={handleChangeSex}
											placeholder="Select Sex"
										/>
										<span className="text-red-600">
											{errors.sex}
										</span>
									</div>


									<div className="mb-0">
										<label className="">Class</label>

										<Select name="class"
											options={classOptions}
											value={selectedClass.value}
											onChange={handleSelectedClass}
											placeholder="Select Class "
										/>

										<span className="text-red-600">
											{errors.class}
										</span>
									</div>


									<div className="mb-0">
										<label className="">Subjects</label>

										<Select name="subject_id"
											options={SubjectOptions}
											value={selectedSubject}
											isMulti
											onChange={(e) => handleSelectedSubject(e)}
											placeholder="Select Class "
										/>
										<span className="text-red-600">
											{errors.subject_id}
										</span>
									</div>

								</div>
								<div className="mt-4">
									<button type="submit" className="px-6 py-2 font-bold text-white bg-green-500 rounded">Save</button>
								</div>
							</form>

						</div>
					</div>
				</div>
			</div>
		</AuthenticatedLayout>
	);      }


