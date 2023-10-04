import React, { Component } from 'react';
import excelIcon from "../assets/excel-icon.png";
import { Link } from "react-router-dom";
export class Home extends Component {
  static displayName = Home.name;

  render() {
    return (
        <div className="container">
            <div className="row mt-5">
                <div className="col-12">
                    <h1 className="text-primary" style={{color:"#1daaf1!important"}}> Modulhandbuch</h1>
                </div>
            </div>

            <div className="row mt-5 ml-3">
                <div className="col-12">
                    <Link style={{textDecoration: 'none' }}
                          to="/UploadFile">
                        <div className="card round-2 px-4 py-4" style={{width: '370px'}}>
                            <img src={excelIcon} style={{width: '101px'}} className="card-img-top" alt={""} />
                            <div className="card-body">
                                <h5 className="card-title" style={{color:"#000000"}}>Excel-Datei einlesen</h5>
                                <p className="card-text" style={{color:"#000000"}}>Hier können Sie ihre Excel-Datei einlesen</p>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
  }
}
//

// import "./App.css";

//
//
// export default Home;


// import React, { Component } from 'react';
//
// export class Home extends Component {
//   static displayName = Home.name;
//
//   render() {
//     return (
//       <div>
//         <h1>Hello, world!</h1>
//         <p>Welcome to your new single-page application, built with:</p>
//         <ul>
//           <li><a href='https://get.asp.net/'>ASP.NET Core</a> and <a href='https://msdn.microsoft.com/en-us/library/67ef8sbd.aspx'>C#</a> for cross-platform server-side code</li>
//           <li><a href='https://facebook.github.io/react/'>React</a> for client-side code</li>
//           <li><a href='http://getbootstrap.com/'>Bootstrap</a> for layout and styling</li>
//         </ul>
//         <p>To help you get started, we have also set up:</p>
//         <ul>
//           <li><strong>Client-side navigation</strong>. For example, click <em>Counter</em> then <em>Back</em> to return here.</li>
//           <li><strong>Development server integration</strong>. In development mode, the development server from <code>create-react-app</code> runs in the background automatically, so your client-side resources are dynamically built on demand and the page refreshes when you modify any file.</li>
//           <li><strong>Efficient production builds</strong>. In production mode, development-time features are disabled, and your <code>dotnet publish</code> configuration produces minified, efficiently bundled JavaScript files.</li>
//         </ul>
//         <p>The <code>ClientApp</code> subdirectory is a standard React application based on the <code>create-react-app</code> template. If you open a command prompt in that directory, you can run <code>npm</code> commands such as <code>npm test</code> or <code>npm install</code>.</p>
//       </div>
//     );
//   }
// }