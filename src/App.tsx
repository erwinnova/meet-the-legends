import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";

import "./App.css";
import { API_URL } from "./constant/api";
import { Chars } from "./constant/types/chars";
import CharDetailModal from "./components/modal/charDetailModal";

function App() {
    const [chars, setChars] = useState<Chars[]>([]);
    const [allRoles, setAllRoles] = useState<string[]>([]);
    const [filteredRoles, setFilteredRoles] = useState<string[]>([]);
    const [selectedRole, setSelectedRole] = useState<string>("All");
    const [countSelectedRole, setCountSelectedRole] = useState<number>(0);
    const [searchValue, setSearchValue] = useState<string>("");
    const [searchResults, setSearchResults] = useState<Chars[]>([]);
    const [showPageSearchResult, setShowPageSearchResult] =
        useState<boolean>(false);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [selectedChar, setSelectedChar] = useState<Chars | undefined>(
        undefined,
    );

    const fetchChars = async () => {
        const response = await fetch(API_URL);
        const charResponse: Chars[] = await response.json();
        const roles: string[] = [];

        // map every roles
        for (let i = 0; i < charResponse.length; i++) {
            roles.push(charResponse[i].role);
        }
        // remove duplicate roles
        const uniqueArray = roles.filter(function (item, pos) {
            return roles.indexOf(item) === pos;
        });
        setAllRoles(roles);
        setFilteredRoles(uniqueArray);
        setChars(charResponse);
        setCountSelectedRole(roles.length);
    };

    const renderRoles = () => {
        return filteredRoles.map((val, idx) => {
            return (
                <div className="col ">
                    <div
                        className="custom-role-list"
                        onClick={() => onSelectRole(val)}
                    >
                        {val}
                    </div>
                </div>
            );
        });
    };

    const countRole = () => {
        var total: number = 0;
        if (selectedRole === "All") {
            total = allRoles.length;
        } else {
            for (let i = 0; i < allRoles.length; i++) {
                if (allRoles[i] === selectedRole) {
                    total += 1;
                }
            }
        }
        setCountSelectedRole(total);
    };

    const onBtnSearchClicked = () => {
        const res = chars.filter((obj) =>
            obj.displayName
                .toLocaleLowerCase()
                .includes(searchValue.toLocaleLowerCase()),
        );
        setSearchResults(res);
        setShowPageSearchResult(true);
        setSelectedRole("All");
    };

    const renderChars = (param: Chars[]) => {
        return param.map((val, idx) => {
            return (
                <div
                    className="card"
                    style={{
                        width: "18rem",
                        margin: "3px",
                        borderColor: "#FF6500",
                    }}
                    onClick={() => onSelectChar(val)}
                >
                    <img
                        src={val.displayIcon}
                        className="card-img-top"
                        alt={val.displayName}
                    />
                    <div className="card-body">
                        <p className="card-text" style={{ color: "#FF8A08" }}>
                            {val.displayName}
                        </p>
                    </div>
                </div>
            );
        });
    };

    const onBtnClearSearch = () => {
        setSearchValue("");
        setSearchResults([]);
        setShowPageSearchResult(false);
        setSelectedRole("All");
    };

    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = () => setShowModal(true);

    const onSelectChar = (char: Chars) => {
        setSelectedChar(char);
        handleShowModal();
    };

    const onSelectRole = (param: string) => {
        if (param === "All") {
            setShowPageSearchResult(false);
        } else {
            const res = chars.filter((obj) =>
                obj.role
                    .toLocaleLowerCase()
                    .includes(param.toLocaleLowerCase()),
            );
            setSearchResults(res);
            setShowPageSearchResult(true);
        }
        setSelectedRole(param);
    };

    useEffect(() => {
        fetchChars();
    }, []);

    useEffect(() => {
        countRole();
    }, [selectedRole]);

    return (
        <div className="container">
          
            <h1 className="custom-title">Meet the legends</h1>
            <div
                className="custom-role-list"
                onClick={() => onSelectRole("All")}
            >
                All
            </div>
            <div>
                <div className="row">{renderRoles()}</div>
            </div>
            <div className="justify-content-center align-items-center d-flex">
                {selectedRole} Role : {countSelectedRole}
            </div>

            <div className="justify-content-center align-items-center d-flex mb-3">
                <input
                    placeholder="search"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    onKeyDown={(event) => {
                        if (event.key === "Enter") {
                            onBtnSearchClicked();
                        }
                    }}
                />
                <div className="mx-1">
                    <FaSearch
                        className="custom-clear-btn"
                        onClick={onBtnSearchClicked}
                    />
                </div>
                {searchValue !== "" && (
                    <div
                        className="custom-clear-btn"
                        onClick={onBtnClearSearch}
                    >
                        X
                    </div>
                )}
            </div>
            {showPageSearchResult ? (
                <div className="row justify-content-between">
                    {renderChars(searchResults)}
                </div>
            ) : (
                <div className="row justify-content-between">
                    {renderChars(chars)}
                </div>
            )}

            <CharDetailModal
                show={showModal}
                handleClose={handleCloseModal}
                handleShow={handleShowModal}
                data={selectedChar}
            />
        </div>
    );
}

export default App;
