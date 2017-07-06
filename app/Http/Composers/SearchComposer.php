<?php

namespace App\Http\Composers;

use DateTime;
use DatePeriod;
use DateInterval;
use Illuminate\Contracts\View\View;

class SearchComposer
{
    public function compose(View $view)
    {
        $begin = new DateTime( '2015-01-01' );
        $end = new DateTime( '2015-01-02' );
        
        $interval = DateInterval::createFromDateString('30 minutes');
        $period = new DatePeriod($begin, $interval, $end);
        
        $times = [];
        foreach ( $period as $dt ) {
            $times[$dt->format('H:i')] = $dt->format('g:i A');
        }
        
        $view->with('times', $times);
    }
}