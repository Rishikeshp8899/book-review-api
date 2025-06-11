import  './login.css'
const Login=()=>{
    return(
        <div className='main'>
            <div className="form">
                <h1 className='text-center bg-transparent'>Login</h1>
                <form action="">
                    <div className="group">
                        <label htmlFor="email" className='bg-transparent h3'>Email</label>
                        <br />
                        <input type="email" className='w-100 transparent' style={{height:'30px', background:'white'}} name="" id="email" placeholder='abc@gmail.com'/>
                    </div>
                    <div className="group">
                        <label htmlFor="password"  className='bg-transparent h3'>Password</label><br />
                        <input type="password" className='w-100 ' style={{height:'30px', background:'white'}} name="" id="password" />
                    </div>
                    <div className="group d-flex align-items-center  justify-content-center p-4">
                        <input type="submit" className='w-25 align-self-center h4' style={{height:'4vh', margin:'0',padding:'0' ,background:'green'}} name="" id="summit" />
                    </div>
                </form>
            </div>
    </div>
    );
};
export default Login;