<!DOCTYPE html>
<html dir="ltr" lang="pt-br" class=" js no-touch csstransitions">

<head>
    <!-- Metas -->
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta name="title" content="@yield('meta_title')">
    <meta name="DC.title" content="@yield('meta_title')">
    <meta property="og:title" content="@yield('meta_title')">
    <meta property="og:type" content="website" />
    <meta name="description" content="@yield('meta_description')">
    <meta itemprop="description" content="@yield('meta_description')">
    <meta property="og:description" content="@yield('meta_description')">
    <meta property="og:url" content="{{ Request::url() }}" />
    <link rel="canonical" href="{{ Request::url() }}" />
    <meta itemprop="image" content="@yield('meta_image')">
    <meta property="og:image" content="@yield('meta_image')">

    <!-- Favicon -->



    <!-- Title  -->
    <title>@yield('title')</title>



    {!! Value::get('scripts_head') !!}
</head>

<body>
    {!! Value::get('scripts_body_start') !!}

    <script>
        var _url = "{{ url('/') }}";
        var _urlS3 = "{{ config('filesystems.disks.s3.url') }}";
        var _token = "{{ csrf_token() }}";
        var _urlcrm = "{{ Value::get('urlcrm') }}";
        var _crmkey = "{{ Value::get('crmkey') }}";
    </script>


    <div class="page-wrapper">

        {{-- @include('site.widgets.header') --}}

        @yield('content')

        {{-- @include('site.widgets.footer') --}}

    </div>
    
    @stack('linkscripts')

    @stack('scripts')


    @stack('head')

    {!! Value::get('scripts_body_end') !!}

    
</body>

</html>
