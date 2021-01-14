import React, { useState } from "react";
import { useSpring, animated } from "react-spring";

import DegustatorLogin from "../../components/Login/DegustatroLogin/DegustatorLogin";
import AdminLogin from "../../components/Login/AdminLogin/AdminLogin";

const LoginForm = (props) => {
  const [adminLoginShow, setAdminLoginShow] = useState(false);
  const toggleLogin = () => {
    setAdminLoginShow((prevState) => !prevState);
  };
  const { transform, opacity } = useSpring({
    opacity: adminLoginShow ? 1 : 0,
    transform: `perspective(1000px) rotateX(${adminLoginShow ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 },
  });
  return (
    <div> 
      <animated.div
        style={{ opacity: opacity.interpolate((o) => 1 - o), transform }}
      >
        {!adminLoginShow && <DegustatorLogin toggleLogin={toggleLogin} />}
      </animated.div>
      <animated.div
        style={{
          opacity,
          transform: transform.interpolate((t) => `${t} rotateX(180deg)`),
        }}
      >
        {adminLoginShow && <AdminLogin toggleLogin={toggleLogin} />}
      </animated.div>
    </div>
  );
};

export default LoginForm;