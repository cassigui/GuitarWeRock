@extends('layouts.site')

@push('head')
    @section('meta_title') {{ $seo->title }} @endsection
    @section('meta_description') {{ $seo->description }} @endsection
    @section('meta_image')
        @if (!empty($seo->image))
            {{ config('filesystems.disks.s3.url') . $seo->image['path'] }}
        @endif
    @endsection
    @section('title') {{ $seo->title }} @endsection
@endpush

@section('content')
    <h1>Projeto base</h1>
@endsection

@push('linkscripts')
@endpush

@push('scripts')
@endpush
