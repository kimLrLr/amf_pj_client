import { HashRouter, Route, Routes } from "react-router-dom";
import { routes } from "./routes";
import { Main } from "./pages/main/Main";
import { Join } from "./pages/account/Join";
import { Login } from "./pages/account/Login";
import { PageNotFound } from "./pages/404/PageNotFound";
import MainLayout from "./MainLayout";

function Router() {
  return (
    <HashRouter>
      <Routes>
        {/* Header, Footer를 보여주고싶은 컴포넌트 */}
        <Route element={<MainLayout />}>
          <Route path={routes.main} element={<Main />} />
          <Route path="/*" element={<PageNotFound />} />
        </Route>
        {/* Header, Footer를 보여주고 싶지 않은 컴포넌트 */}
        <Route path={routes.join} element={<Join />} />
        <Route path={routes.login} element={<Login />} />
      </Routes>
    </HashRouter>
  );
}

export default Router;
