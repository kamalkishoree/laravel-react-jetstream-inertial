<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Teacher extends Model
{
    use HasFactory;

    protected $table = 'teacher';

    protected $fillable = [
        'name',
        'age',
        'sex'
    ];
    public function subjects()
    {
        return $this->belongsToMany(Subject::class);
    }
}
