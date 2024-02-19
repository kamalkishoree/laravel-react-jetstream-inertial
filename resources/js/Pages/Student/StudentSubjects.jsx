import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage, Link, router } from '@inertiajs/react';

export default function Dashboard(props) {
	const { data } = usePage().props
	return (
		<AuthenticatedLayout auth={props.auth} user={props.auth.user} errors={props.errors} header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">subjects</h2>}>
			<Head title="Posts" />
			<div className="py-12">
				<div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
					<div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
						<div className="p-6 bg-white border-b border-gray-200">
							<div className="flex items-center justify-between mb-6">
								<Link className="px-6 py-2 text-white bg-green-500 rounded-md focus:outline-none" href={route("student.index")}>Back</Link>
							</div>
							<table className="table-fixed w-full">
								<thead>
									<tr className="bg-gray-100">
										<th className="px-4 py-2">Subject Name</th>
										<th className="px-4 py-2">Subject Teachers</th>

									</tr>
								</thead>
								<tbody>
									{data && data.map((item) => (
										<tr key={item.id}>
											<td className="border px-4 py-2">{item.subject}</td>
											<td className="border px-4 py-2">{item.teachers}</td>
										</tr>
									))}
									{data.length === 0 && (
										<tr>
											<td className="px-6 py-4 border-t" colSpan="4">No Subject found.</td>
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