<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SearchRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        if ($this->arrivalDate == $this->returnDate) {
            return $this->timeRules();
        }
        
        return $this->defaultRules();
    }
    
    /**
     * @return array
     */
    private function defaultRules()
    {
        return [
            'arrivalDate' => 'required|date',
            'arrivalTime' => 'required',
            'returnDate' => 'required|after_or_equal:arrivalDate',
            'returnTime' => 'required'
        ];
    }
    
    /**
     * @return array
     */
    private function timeRules()
    {
        return [
            'arrivalDate' => 'required|date',
            'arrivalTime' => 'required',
            'returnDate' => 'required|after_or_equal:arrivalDate',
            'returnTime' => 'required|after:arrivalTime'
        ];
    }
}
