@extends('layouts.mail')

@section('header')
<a href="{{ url('/') }}" target="_blank">
	<img style="max-height:70px;" src="{{ asset('site/images/logo/logo.svg') }}">
</a>
@endsection

@section('intro-h1')
@endsection

@section('intro-p')
@endsection

@section('content')
<p>
    <span style="font-weight: bold">
        Recebemos uma solicitação para redefinição de senha no 
        Site {{ $fantasy_name }}, clique abaixo para prosseguir. 
        Caso você não requisitou esta redefinição, ignore este e-mail.
    </span>
</p>

<p>
    <a href="{{  url('password/reset/' . $token) }}">Redefinir Senha</a>
</p>
<br>
@endsection

@section('outro')
@endsection

@section('notes')
Caso esteja tendo problemas, copie e cole o link abaixo no seu navegador: <br />
<a href="{{  url('password/reset/' . $token) }}">{{  url('password/reset/' . $token) }}</a>

@endsection

@section('footer')
<p>{{ $fantasy_name }}</p>
<p>
	<a href="{{ url('/') }}" style="font-family:Avenir,Helvetica,sans-serif;box-sizing:border-box;color:#3869d4" target="_blank" >
		Acesse o site
	</a>
</p>
@endsection
