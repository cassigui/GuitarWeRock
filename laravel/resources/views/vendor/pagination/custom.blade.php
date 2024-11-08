@if ($paginator->hasPages())
<nav class="navigation pagination">
    <div class="nav-links">

        {{-- Previous Page Link --}}
        @if ($paginator->onFirstPage())
        <a class="prev page-numbers disabled" href="javascript:;">Anterior</a>
        @else
        <a class="prev page-numbers" rel="prev" href="{{ $paginator->previousPageUrl() }}" aria-label="@lang('pagination.previous')">Anterior</a>
        @endif

        {{-- Pagination Elements --}}
        @foreach ($elements as $element)
        {{-- "Three Dots" Separator --}}
        @if (is_string($element))
        <span class="page-numbers current" aria-disabled="true">{{ $element }}</span>
        @endif

        {{-- Array Of Links --}}
        @if (is_array($element))
        @foreach ($element as $page => $url)
        @if ($page == $paginator->currentPage())
        <a class="page-numbers disabled" href="javascript:void(0)">{{ $page }}</a>
        @else
        <a class="page-numbers" href="{{ $url }}">{{ $page }}</a>
        @endif
        @endforeach
        @endif
        @endforeach

        {{-- Next Page Link --}}
        @if ($paginator->hasMorePages())
        <a class="prev page-numbers " rel="next" href="{{ $paginator->nextPageUrl() }}" aria-label="@lang('pagination.next')">Próxima</a>
        @else
        <a class="prev page-numbers disabled" href="javascript:;">Próxima</a>
        @endif

    </div>
</nav>
@endif