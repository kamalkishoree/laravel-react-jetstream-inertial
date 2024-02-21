<?php
namespace App\Http\Controllers;

use App\Models\Student;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;
use App\Models\Teacher;
use Illuminate\Support\Facades\Request;
use App\Models\Subject;
use App\Http\Requests\StoreStudentRequest;
use App\Http\Requests\UpdateStudentRequest;

class StudentController extends Controller
{

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $students = Student::paginate(5);
        $subjects = Subject::all();
        return Inertia::render('Student/index', [
            'students' => $students,
            'subjects' => $subjects
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $subjects = Subject::all();

        return Inertia::render('Student/Create', [
            'subjects' => $subjects
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreStudentRequest $request)
    {
        try {
            $Student = new Student();
            $Student->name = $request->name;
            $Student->age = $request->age;
            $Student->sex = $request->sex;
            $Student->class = $request->class;
            $Student->roll_no = $request->roll_no;
            $Student->subject_id = implode(',', $request->subject_id);

            if ($Student->save()) {

                return redirect()->route('student.index');
            } else {
                return response()->json([
                    'message' => 'Something goes wrong while creating a Student!!'
                ], 500);
            }
        } catch (\Exception $e) {
            \Log::error($e->getMessage());
            return response()->json([
                'message' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Student $Student)
    {
        return Inertia::render('Student/Show', [
            'Student' => $Student
        ]);
    }

    public function edit(Student $Student)
    {
        $subjects = Subject::all();
        return Inertia::render('Student/Edit', [
            'subjects' => $subjects,
            'student' => $Student
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateStudentRequest $request, Student $Student)
    {
        Student::find($Student->id)->update($request->all());

        return redirect()->route('student.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Student $Student)
    {
        Student::findOrFail($Student->id)->delete();
        return redirect()->route('student.index');
    }

    public function getStudentSubjects($id)
    {
        $data = [];
        $student = Student::find($id);
        if ($student) {
            $ids = $student->subject_id;
            if (! empty($ids)) {
                $student_subject = explode(',', $ids);
                $subjects = Subject::whereIn('id', $student_subject)->select('id', 'name', 'teacher_id')
                    ->get()
                    ->toArray();
                foreach ($subjects as $subject) {
                    $teacher_ids = explode(',', $subject['teacher_id']);
                    $teachers = Teacher::whereIn('id', $teacher_ids)->pluck('name')->toArray();
                    $row['subject'] = $subject['name'];
                    $row['teachers'] = implode(',', $teachers);
                    $data[] = $row;
                }
            }
        }

        return Inertia::render('Student/StudentSubjects', [
            'data' => $data
        ]);
    }

    public function optimizeStudentSubject($user_id)
    {
        $user_id = 1;
        $teachers = Teacher::whereHas('subjects.students', function ($query) use ($user_id) {
            $query->where('students.id', $user_id);
        })->with([
            'subjects' => function ($query) use ($user_id) {
                $query->whereHas('students', function ($query) use ($user_id) {
                    $query->where('students.id', $user_id);
                });
            }
        ])
            ->get();
        return print_r($teachers);
    }
}
