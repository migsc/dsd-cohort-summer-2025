'use client';

import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export default function SearchBar({ placeholder = 'Search services...' }: {placeholder: string}) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    
    const handleSearch = useDebouncedCallback((term: string) => {
        const params = new URLSearchParams(searchParams);
        console.log(`Searching... ${term}`);

        // set params string based on user input
        if(term) {
            params.set('query', term);
        } else {
            params.delete('query');
        };
        // update URL with user's search query
        replace(`${pathname}?${params.toString()}`);
    }, 400);

    return (
        <div className='relative w-full max-w-md'>
            <Search className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400' />

            <Input
                className='pl-10 rounded-full'
                placeholder={placeholder}
                onChange={(e) => handleSearch(e.target.value)}
                defaultValue={searchParams.get('query')?.toString()}
            />
        </div>
    );
};