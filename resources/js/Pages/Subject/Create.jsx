import { React, useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import $ from 'jquery';
import Select from "react-select";


export default function Dashboard(props) {
	const { data, setData, errors, post } = useForm({
		name: "",
		class: "",
		language: "",
		teacher_id: ""
	});
	const { teachers } = props;
	const [selectedLanguage, setselectedLanguage] = useState([]);
	const [selectedClass, setselectedClass] = useState("");
	const [selectedteachers, setSelectedTeachers] = useState([]);

	const [teachersData, setTeachersData] = useState([]);


	const handleChangeLan = (selectedLanguage) => {
		const newSelectedLan = selectedLanguage;
		setselectedLanguage(newSelectedLan);
		const all_language = selectedLanguage.map((item) => item.value);
		setData("language", all_language);
	};

	const handleSelectedClass = (selectedClass) => {
		const newSelectedClass = selectedClass.value;
		setselectedClass(newSelectedClass);
		setData("class", newSelectedClass);

	};

	const handleChangeTeacher = (selectedteachers) => {
		const newTeacher = selectedteachers;
		setSelectedTeachers(newTeacher);
		const all_teachers = selectedteachers.map((item) => item.value);
		setData("teacher_id", all_teachers);
	};



	const teacherOptions = teachers.map(({ id, name }) => ({
		value: id,
		label: name,
	}));




	const languageOptions = [
		{ value: "English", label: "English" },
		{ value: "Hindi", label: "Hindi" },
		{ value: "Punjabi", label: "Punjabi" },
		{ value: "French", label: "French" },
		{ value: "Chinese", label: "Chinese" },
	];

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




	function handleSubmit(e) {
		e.preventDefault();
		post(route("subject.store"));
	}

	return (
		<AuthenticatedLayout auth={props.auth} user={props.auth.user} errors={props.errors} header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">ADD SUBJECT</h2>}>
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

									<div className="mb-0">
										<label className="">Language</label>

										<Select name="language"
											options={languageOptions}
											value={selectedLanguage}
											onChange={handleChangeLan}
											isMulti
											placeholder="Select languagel"
										/>


										<span className="text-red-600">
											{errors.language}
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
										<label className="">Teacher</label>
										<Select name="teacher_id"
											options={teacherOptions}
											value={selectedteachers}
											onChange={handleChangeTeacher}
											isMulti
											placeholder="Select Teachers"
										/>
										<span className="text-red-600">
											{errors.teacher_id}
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
	);
}    