export default function FormError({type, errorType}: {
    type: 'title' | 'author' | 'deadline',
    errorType: 'empty' | 'too-short' | 'wrong-format' | ''
    }){

    return (
        <p className='text-red-700'>{
            type[0].toUpperCase() + type.slice(1) + (
                errorType == 'empty' ? ' is required' :
                (errorType == 'too-short' ? ' should be at least 3 characters' :
                ' should be of DD/MM/YYYY format')
            )
        }</p>
    );
}