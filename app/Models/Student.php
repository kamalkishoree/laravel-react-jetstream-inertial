<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Scopes\StudentScope;

class Student extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'age',
        'sex',
        'class',
        'teacher_id',
        'subject_id',
        'roll_no'
    ];

    protected static function booted()
    {
        static::addGlobalScope(new StudentScope());
    }

    public function subjects()
    {
        return $this->belongsToMany(Subject::class, 'student_subject', 'student_id', 'subject_id');
    }
}


