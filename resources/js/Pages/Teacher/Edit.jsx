import { React, useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, usePage, Link } from '@inertiajs/react';
import Select from "react-select";

export default function Dashboard(props) {
const {teacher}= props;
	const [SelectedSex, setSelectSex] = useState("");

	const { data, setData, errors, put } = useForm({
		name: teacher.name||"",
		sex: teacher.sex||"",
		age:teacher.age||""
	});

	const sexOptions = [
		{ value: "Male", label: "male" },
		{ value: "Female", label: "Female" },
		{ value: "Other", label: "Other" },
	];

	const handleChangeSex = (SelectedSex) => {
		const newSex = SelectedSex.val;
		setSelectSex(newSex);
		setData("sex", SelectedSex.value);
	};



	function handleSubmit(e) {
		e.preventDefault();
		put(route("teacher.update", teacher.id));
	}

	return (

		<AuthenticatedLayout auth={props.auth} user={props.auth.user} errors={props.errors} header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Add teacher</h2>}>
			<Head title="Posts" />
			<div className="py-12">
				<div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
					<div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
						<div className="p-6 bg-white border-b border-gray-200">
							<div className="flex items-center justify-between mb-6">
								<Link className="px-6 py-2 text-white bg-blue-500 rounded-md focus:outline-none" href={route("teacher.index")}>Back</Link>
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

									<div className="mb-4">
										<label className="">Age</label>
										<input type="number" className="w-full px-4 py-2" label="Age" name="age" value={data.age} onChange={(e) => setData("age", e.target.value)} />
										<span className="text-red-600">
											{errors.age}
										</span>
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