import React, { useState } from "react";
import Documents from "./Documents";
import Folder from "../Cards/Folder";

const CompanyPage = ({ contract, fetched, folders }) => {
  const [folderclosed, setfolderclosed] = useState(true);
  const [docs, setdocs] = useState(null);
  const [val, setval] = useState(0);
  const openFolder = async (i) => {
    try {
      const res = await contract.returnDocs(i);
      console.log(res);
      setval(i);
      setdocs(res);
      setfolderclosed(false);
    } catch (error) {
      console.log("Error");
    }
  };
  return (
    <div>
      {folderclosed ? (
        <div>
          {fetched && (
            <div className="row">
              <div className="row__1">
                <div className="row__header">
                  <div className="row__title">My folders</div>
                  <button className="row__btn">
                    View all <span>&rarr;</span>
                  </button>
                </div>
                <div className="row__sections">
                  {folders.map((folder, i) => {
                    return (
                      <div
                        onClick={() => {
                          openFolder(i);
                        }}
                      >
                        <Folder contract={contract} folder={folder} />
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="row__2">
                <div className="row__header">
                  <div className="row__title">Requests</div>
                </div>
                <div className="row__sections">
                  <div className="column"></div>
                  <div className="column"></div>
                  <div className="column"></div>
                </div>
              </div>
              <div className="row__3">
                <div className="row__header">
                  <div className="row__title">History</div>
                  <button className="row__btn">
                    View all <span>&rarr;</span>
                  </button>
                </div>
                <div className="row__sections">
                  <div className="column"></div>
                  <div className="column"></div>
                  <div className="column"></div>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <Documents
          val={val}
          setfolderclosed={setfolderclosed}
          name={folders[val]}
          contract={contract}
          docs={docs}
        />
      )}
    </div>
  );
};

export default CompanyPage;
