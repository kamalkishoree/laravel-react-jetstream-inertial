<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Subject extends Model
{
    use HasFactory;

    protected $table = 'subjects';

    protected $fillable = [
        'name',
        'class',
        'language'
    ];

    public function teachers()
    {
        return $this->belongsToMany(Teacher::class, 'teacher_subject', 'subject_id', 'teacher_id');
    }
}
