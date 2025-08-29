import React from 'react'
import useFetch from '@/hooks/useFetch'
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useNavigate } from 'react-router-dom';

function BlogsCategory() {
    const { data, loading, error } = useFetch({ url: '/blog/category' });
    console.log(data, "data");

    const navigate = useNavigate();
    const handleClick = (qr) => {
        navigate(`/blogs?query=${qr}`)
    }
    if (loading) return <SkeletonUI count={100} />
    if (error) return <p>EROOR</p>

    return (
        <div className="flex flex-wrap gap-3 bg-card border rounded-2xl p-4">
            {
                data?.map((item: any, index: number) => (
                    <Button key={item?.id} onClick={() => handleClick(item?.value)} className="" variant={'outline'}>
                        {item?.label}
                    </Button>
                ))}
        </div>
    )
}

export default BlogsCategory

const SkeletonUI = ({ count }: { count: number }) => {
    return (
        <div className="flex flex-wrap gap-3 bg-card text-card-foreground border rounded-2xl p-4">
            {
                Array.from({ length: count }).map((_, i) => (
                    <Skeleton key={i} className={`rounded-lg border bg-card h-4 w-1/3`} />
                ))
            }
        </div>
    )
}

