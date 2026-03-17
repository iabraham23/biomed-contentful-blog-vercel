import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Introductory Biomedical Imaging",
  description: "By Bethe A. Scalettar & James R. Abney",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <style>{`
          header { border-bottom: 2px solid #eee; padding-bottom: 20px; margin-bottom: 30px; }
          .links { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; font-size: 14px; }
          .dropdown { position: relative; display: inline-block; }
          .dropbtn { background: #f0f0f0; border: 1px solid #ccc; padding: 5px 10px; cursor: pointer; border-radius: 4px; }
          .dropbtn a { text-decoration: none; color: inherit; }
          .dropdown-content { 
            display: none; 
            position: absolute; 
            background-color: white; 
            min-width: 220px; 
            box-shadow: 0px 8px 16px rgba(0,0,0,0.1); 
            z-index: 10; 
            border: 1px solid #ddd;
          }
          .dropdown-content a { color: black; padding: 10px 15px; text-decoration: none; display: block; border-bottom: 1px solid #eee; }
          .dropdown-content a:hover { background-color: #f1f1f1; }
          .dropdown:hover .dropdown-content { display: block; }
        `}</style>
      </head>
      <body
        style={{
          fontFamily: "system-ui, -apple-system, sans-serif",
          maxWidth: "900px", // Widened slightly to fit the new nav
          margin: "0 auto",
          padding: "2rem 1rem",
          lineHeight: 1.6,
          color: "#1a1a1a",
        }}
      >
        <header>
          <h1 style={{ margin: "0 0 0.5rem 0", fontSize: "2rem" }}>Introductory Biomedical Imaging</h1>
          <h2 style={{ margin: "0 0 1rem 0", fontSize: "1.2rem", color: "#666", fontWeight: "normal" }}>
            Bethe A. Scalettar & James R. Abney
          </h2>
          <nav className="links">
            <a href="index.html">Home</a> |
            <div className="dropdown">
              <button className="dropbtn"><a href="course_materials.html">Course Materials</a></button>
              <div className="dropdown-content">
                <a href="assets/Physics_390-Syllabus_SP26.pdf">Syllabus</a>
                <a href="assets/Physics_390-Lecture_Notes_SP26.pdf">Lecture Notes</a>
                <a href="course_materials.html">PowerPoint Slides</a>
                <a href="assets/Physics_390-In-Class_Activities_SP26.pdf">In-Class Activities</a>
                <a href="course_materials.html">Course Reviews</a>
                <a href="course_materials.html">Practice Examinations</a>
                <a href="assets/IntroductoryBiomedicalImaging-Homework_Files.zip">Homework Materials</a>
              </div>
            </div> |
            <div className="dropdown">
              <button className="dropbtn"><a href="case_studies.html">Case Studies</a></button>
              <div className="dropdown-content">
                <a href="case_studies.html">Ultrasound/X-Ray</a>
                <a href="case_studies.html">Colonoscopy</a>
                <a href="case_studies.html">CT Scan</a>
                <a href="case_studies.html">Magnetic Resonance Imaging</a>
              </div>
            </div> |
            <div className="dropdown">
              <button className="dropbtn"><a href="simulations.html">Simulations</a></button>
              <div className="dropdown-content">
                <a href="simulation_ultrasound.html">Ultrasound Simulations</a>
                <a href="simulation_xray.html">X-Ray Simulations</a>
                <a href="simulation_radionuclide.html">Radionuclide Simulations</a>
                <a href="simulation_magnetic.html">MRI Simulations</a>
              </div>
            </div> |
            <a href="author_information.html">Author Information</a> |
            <a href="https://blog.introbiomedicalimaging.org/"> Blog</a>
          </nav>
        </header>

        <main>{children}</main>
      </body>
    </html>
  );
}