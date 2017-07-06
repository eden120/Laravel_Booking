<?php

namespace App\System\Models;

use Carbon\Carbon;
use Ramsey\Uuid\Uuid;
use Illuminate\Database\Eloquent\Model;

class Search extends Model
{
    protected $table = 'searches';
    
    protected $fillable = ['arrival_date', 'return_date', 'promo_code', 'prepaid'];
    
    protected $dates = ['created_at', 'updated_at', 'arrival_date', 'return_date'];
    
    protected $casts = [
        'results' => 'array',
    ];
    
    public static function boot()
    {
        parent::boot();
        self::creating(function($user) {
            $user->token = Uuid::uuid1()->toString();
        });
    }
    
    public function getArrivalDateAttribute($value)
    {
        return date('Y-m-d H:i', strtotime($value));
    }
    
    public function getReturnDateAttribute($value)
    {
        return date('Y-m-d H:i', strtotime($value));
    }
    
    public function arrivalDate()
    {
        return date('m/d/Y', strtotime($this->arrival_date));
    }
    
    public function arrivalTime()
    {
        return date('g:i A', strtotime($this->arrival_date));
    }
    
    public function returnDate()
    {
        return date('m/d/Y', strtotime($this->return_date));
    }
    
    public function returnTime()
    {
        return date('g:i A', strtotime($this->return_date));
    }
    
    public function diffInDays()
    {
        $arrival = Carbon::createFromFormat('Y-m-d H:i', $this->arrival_date);
        $return = Carbon::createFromFormat('Y-m-d H:i', $this->return_date);
        return $arrival->diffInDays($return);
    }
}
