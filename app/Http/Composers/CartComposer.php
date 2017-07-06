<?php

namespace App\Http\Composers;

use DateTime;
use DatePeriod;
use DateInterval;
use Illuminate\Contracts\View\View;

class CartComposer
{
    public function compose(View $view)
    {
        
        $years = $this->getYears();
        $months = $this->getMonths();
        $cards = $this->getCards();
        
        $view->with('years', $years);
        $view->with('months', $months);
        $view->with('cards', $cards);
        
    }
    
    /**
     * @return array
     */
    private function getMonths()
    {
        $begin = new DateTime('2016-01-01');
        $end = new DateTime('2017-01-01');
        
        $interval = DateInterval::createFromDateString('1 Month');
        $period = new DatePeriod($begin, $interval, $end);
        
        $months = [];
        foreach ($period as $dt) {
            $months[$dt->format('m')] = $dt->format('M');
        }
        return $months;
    }
    
    /**
     * @return array
     */
    private function getYears()
    {
        $begin = new DateTime();
        $end = new DateTime();
        $end->add(new DateInterval('P20Y'));
        
        $interval = DateInterval::createFromDateString('1 Year');
        $period = new DatePeriod($begin, $interval, $end);
        
        $years = [];
        foreach ($period as $dt) {
            $years[$dt->format('y')] = $dt->format('Y');
        }
        return $years;
    }
    
    private function getCards()
    {
        return [
            'VI' => 'Visa',
            'MC' => 'Mastercard',
            'DI' => 'Discover',
            'AX' => 'American Express'
        ];
    }
}