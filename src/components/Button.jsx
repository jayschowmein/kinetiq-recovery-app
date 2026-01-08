// Reusable button component with rounded corners and big size for kid-friendly UI
export default function Button({ children, onClick, variant = 'primary', className = '', disabled = false }) {
  const baseStyles = 'px-6 py-4 rounded-2xl font-bold text-lg transition-all duration-200 transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed'
  
  const variants = {
    primary: 'bg-primary-blue text-white hover:bg-primary-lightBlue shadow-lg hover:shadow-xl',
    secondary: 'bg-primary-green text-white hover:bg-primary-lightGreen shadow-lg hover:shadow-xl',
    outline: 'bg-white text-primary-blue border-2 border-primary-blue hover:bg-primary-blue hover:text-white',
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  )
}
