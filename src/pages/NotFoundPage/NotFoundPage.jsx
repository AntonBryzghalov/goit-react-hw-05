import { Link, useLocation, useNavigate } from "react-router-dom";
import css from "./NotFoundPage.module.css";
import { useEffect } from "react";

function NotFoundPage() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate(location.state ?? "/", { replace: true });
    }, 10000);

    return () => clearTimeout(timer);
  }, [location, navigate]);

  return (
    <div className={css.message}>
      Requested page was not found, press{" "}
      <Link to="/" className={css.link} replace>
        go to main page
      </Link>{" "}
      or you will be redirected in 10 seconds automatically
    </div>
  );
}

export default NotFoundPage;
