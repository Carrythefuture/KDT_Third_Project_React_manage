import { Routes, Route, useLocation } from "react-router-dom";


const Main = () => {
    return (

        // 홈일 때와 홈이 아닐 때 레이아웃 
        <div>
            여기는 홈입니다.
            {/*헤더 */}
            {/* <header className={styles.header}>
                <Header isHome={isHome} />
            </header> */}

                
                {/* <main className={styles.main}>
                    
                    <section className={styles.content}>
                        <Routes>
                            <Route path="/" element={<ManageRoutes />}/>
                            <Route path="/member" element={<h2>404 Not Found</h2>} />
                            <Route path="/manage" element={<h2>404 Not Found</h2>} />
                        </Routes>
                    </section>
                </main> */}
        </div>
      
    );
};

export default Main;
