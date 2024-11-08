@extends('layouts.site')

@push('meta')
<meta name="title" content="Página não encontrada.">
<meta name="DC.title" content="Página não encontrada.">
<meta property="og:title" content="Página não encontrada.">
<meta property="og:type" content="website" />
<meta name="description" content="Esta página não existe ou foi movida.">
<meta itemprop="description" content="Esta página não existe ou foi movida.">
<meta property="og:description" content="Esta página não existe ou foi movida.">
<meta property="og:url" content="{{ Request::url() }}" />
<link rel="canonical" href="{{ Request::url() }}" />
<meta itemprop="image" content="{{ asset('site/assets/images/social.png') }}">
<meta property="og:image" content="{{ asset('site/assets/images/social.png') }}">
@endpush

@section('title')
Página não encontrada
@endsection

@push('head')

@endpush

@section('content')
@php
$_404 = true;
@endphp
<h1>404</h1>
@endsection

@push('linkscripts')
@endpush

@push('scripts')
@endpush