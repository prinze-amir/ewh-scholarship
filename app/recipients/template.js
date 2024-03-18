import {TransparentHeader} from '@/components/Headers/transparentHeader'

export default function Template({children}) {
    return (
        <div>
            <TransparentHeader />
            {children}
        </div>
    )
}