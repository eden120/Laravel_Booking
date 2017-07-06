@extends('layouts.default', ['vueContent' => 'Default'])

@section('content')

    @include('elements.page_heading')
    @include('elements.page_title', ['page_title' => 'CONTACT & DIRECTIONS'])
    @include('elements.sticky_header')

    <div id="page-wrapper">

        <div id="page-wrapper-bg-img"></div>

        <div class="container">
            <div class="row">
                <div class="span-4">

                    <div class="box box-nil">
                        <div class="box box-secondary">CONTACT US</div>
                        <div class="box box-margin-cozy">
                            <h4>{{ $directions->location_name }}</h4>
                            <p>
                                {{ $directions->address }},<br />
                                {{ $directions->city }} {{ $directions->state }} {{ $directions->zip }},<br />
                                {{ $directions->phone }}<br />
                                <a href="mailto:info@executivevalet.com">info@executivevalet.com</a>
                            </p>
                            <hr />
                            <h4>Office Hours</h4>
                            <p>24 hours a day, 7 days a week</p>
                        </div>
                    </div>


                </div>
                <div class="span-8" id="directions">
                    <h3>Directions</h3>
                    @foreach($directions->directions as $key => $direction)
                        <h4>Directions from  {{ ucfirst($key) }}</h4>
                        <ul>
                            <li>{!! implode('</li><li>', $direction) !!}</li>
                        </ul>
                    @endforeach

                    <h3>Our Staff</h3>
                    <div class="row">
                        @foreach($directions->staff as $person)

                            <div class="span-3 person">
                                <h5>{{ $person->name }}</h5>
                                <p class="position">{{ $person->position }}</p>

                                @if(isset($person->email))
                                    <a href="mailto:{{ $person->email }}"><img src="{!! $person->image !!}" style="width: 80%"></a>
                                @else
                                    <img src="{!! $person->image !!}" style="width: 80%">
                                @endif
                                @foreach($person->phone as $phone)
                                    <p class="phone">
                                        {{ $phone->number }}
                                        @if($phone->ext)
                                            Ext: {{ $phone->ext }}
                                        @endif
                                    </p>
                                @endforeach
                            </div>
                        @endforeach
                    </div>
                </div>
            </div>
        </div>
    </div>
@stop
