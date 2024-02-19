import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage, Link, router } from '@inertiajs/react';

export default function Dashboard(props) {
	const { teachers } = usePage().props
	function destroy(e) {
		if (confirm("Are you sure you want to delete this product?")) {
			router.delete(route("teacher.destroy", e.currentTarget.id));
		}
	}
	
	return (
		<AuthenticatedLayout auth={props.auth} user={props.auth.user} errors={props.errors} header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">subjects</h2>}>
			<Head title="Posts" />
			<div className="py-12">
				<div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
					<div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
						<div className="p-6 bg-white border-b border-gray-200">
							<div className="flex items-center justify-between mb-6">
								<Link className="px-6 py-2 text-white bg-green-500 rounded-md focus:outline-none" href={route("teacher.create")}>Add Teachers</Link>
							</div>
							<table className="table-fixed w-full">
								<thead>
									<tr className="bg-gray-100">
										<th className="px-4 py-2 w-20">ID.</th>
										<th className="px-4 py-2"> Name</th>
										<th className="px-4 py-2">Age</th>
										<th className="px-4 py-2">Sex</th>
										<th className="px-4 py-2">Action</th>
									</tr>
								</thead>
								<tbody>
									{teachers && teachers.map((item) => (
										<tr key={item.id}>
											<td className="border px-4 py-2">{item.id}</td>
											<td className="border px-4 py-2">{item.name}</td>
											<td className="border px-4 py-2">{item.age}</td>
											<td className="border px-4 py-2">{item.sex}</td>
											<td className="border px-4 py-2">
												<Link tabIndex="1" className="px-4 py-2 text-sm text-white bg-blue-500 rounded" href={route("teacher.edit", item.id)} >Edit</Link>
												<button onClick={destroy} id={item.id} tabIndex="-1" type="button" className="mx-1 px-4 py-2 text-sm text-white bg-red-500 rounded" >Delete</button>
											</td>
										</tr>
									))}
									{teachers.length === 0 && (
										<tr>
											<td className="px-6 py-4 border-t" colSpan="4">No Teachers found.</td>
										</tr>
									)}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</AuthenticatedLayout>
	);
}    