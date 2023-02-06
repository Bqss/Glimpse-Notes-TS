interface props {
  isLoading : boolean,
  children : React.ReactNode
}

const LoadingIndicator: React.FC<props> = ({isLoading, children}) => {
  return isLoading ? (
      <div className="w-full flex mt-20 justify-center flex-1">
        {children}
      </div>
    ) : null ;
  
};

export default LoadingIndicator;
