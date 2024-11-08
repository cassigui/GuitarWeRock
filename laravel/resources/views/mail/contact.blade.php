@extends('layouts.mail')

@section('header')
    <img style="max-height:11rem; height: 11rem;" src="{{ asset('site/images/logo.png') }}">
@endsection

@section('intro-h1')
<span style="font-weight: bold;font-size: 1.5rem; color: #005508">{{ $data['subject'] }}
@endsection

@section('content')
<p style="font-size:1rem">Olá, <span style="font-weight: bold">{{ $data['name'] }}</span></p>
<p>{{ $data['message'] }}</p>
@endsection

@section('outro')
@endsection

@section('notes')
@endsection

@section('footer')
@if($data['lot_id'] > 0)
<p><a href="{{url('/client-view') . '/' . encrypt($data['lot_id']) . '/' . encrypt($data['name'])}}" target="_blank" style="text-decoration:none;color:#005508">Acompanhe seu processo por aqui</a></p>
@endif
@endsection