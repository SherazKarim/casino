

export const Wrapper = ({children, className}) => {
    return(
        <div className={`max-w-[1280px] mx-auto px-5 my-5 ${className}`}>
            {children}
        </div>
    )
}