<?php
namespace App\Http\Controllers;

use App\Models\Subject;
use App\Http\Requests\StoreSubjectRequest;
use App\Http\Requests\UpdateSubjectRequest;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;
use App\Models\Teacher;
use App\Models\Student;

class SubjectController extends Controller
{

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $Subjects = Subject::paginate(5);
        $teachers = Teacher::all();
        return Inertia::render('Subject/index', [
            'subjects' => $Subjects,
            'teachers' => $teachers
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $teachers = Teacher::all();

        return Inertia::render('Subject/Create', [
            'teachers' => $teachers
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSubjectRequest $request)
    {

        try {
            $Subject = new Subject();
            $Subject->name = $request->name;
            $Subject->class = $request->class;
            $Subject->language = implode(',', $request->language);
            $Subject->teacher_id = implode(',', $request->teacher_id);

            if ($Subject->save()) {
                return redirect()->route('subject.index');
            } else {
                return response()->json([
                    'message' => 'Something goes wrong while creating a Subject!!'
                ], 500);
            }
        } catch (\Exception $e) {
            \Log::error($e->getMessage());
            return response()->json([
                'message' => $e->getMessage()
            ], 500);
        }

        return redirect()->route('Subject.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Subject $Subject)
    {
        return Inertia::render('Subject/Show', [
            'Subject' => $Subject
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Subject $Subject)
    {
        $teachers = Teacher::all();
        return Inertia::render('Subject/Edit', [
            'subject' => $Subject,
            'teachers' => $teachers
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSubjectRequest $request, Subject $Subject)
    {

        Subject::find($Subject->id)->update($request->all());

        return redirect()->route('subject.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Subject $Subject)
    {
        Subject::findOrFail($Subject->id)->delete();
        return redirect()->route('subject.index');
    }



}
