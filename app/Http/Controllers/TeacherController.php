<?php
namespace App\Http\Controllers;

use App\Models\Teacher;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use Carbon\Carbon;
use Inertia\Inertia;
use App\Http\Requests\StoreTeacherRequest;
use App\Http\Requests\UpdateTeacherRequest;

class TeacherController extends Controller
{

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $teachers = Teacher::paginate(5);

        return Inertia::render('Teacher/index', [
            'teachers' => $teachers
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $teachers = Teacher::all();
        return Inertia::render('Teacher/Create', [
            'teachers' => $teachers
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTeacherRequest $request)
    {

        try {

            $Teacher = new Teacher();
            $Teacher->name = $request->name;
            $Teacher->age = $request->age;
            $Teacher->sex = $request->sex;

            if ($Teacher->save()) {

                return redirect()->route('teacher.index');
            } else {
                return response()->json([
                    'message' => 'Something goes wrong while creating a Teacher!!'
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
    public function show(teacher $teacher)
    {
        return Inertia::render('teacher/Show', [
            'teacher' => $teacher
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(teacher $teacher)
    {
        return Inertia::render('Teacher/Edit', [
            'teacher' => $teacher
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTeacherRequest $request, teacher $teacher)
    {
        teacher::find($teacher->id)->update($request->all());
        return redirect()->route('teacher.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(teacher $teacher)
    {
        teacher::findOrFail($teacher->id)->delete();
        return redirect()->route('teacher.index');
    }
}
