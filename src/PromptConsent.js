import React from "react";
import styled from "styled-components";
import App from "./App";
import Checkbox from "./components/commons/Checkbox";


const PromptConsent = (props) => {
    const [hasConsented, setHasConsented] = React.useState(localStorage.getItem("consent"));
    const [consent, setConsent] = React.useState(false);
    const [logrocketConsent, setLogrocketConsent] = React.useState(localStorage.getItem("logrocketConsent") || true);


    const handleSetConsent = () => {
        if (logrocketConsent) {
            // setup LogRocket
        }
        setHasConsented(true);
        localStorage.setItem("consent", "true");
    };

    if (hasConsented) {
        return <App />
    } else {
        return (
            <StyledDialog>
                <div>
                    <h1>Consents</h1>

                    <h2>Using the application</h2>
                    <p>To create and maintain radars in this application, users are required to register an account. Data is stored in an AWS infrastructure
                        and is maintained by jorgen.lybeck-hansen@capgemini.com. Users also has to have access to their Capgemini/Sogeti/Idean email
                        as they won't be able to register without.
                </p>
                    <p>
                        If you want to use this application, you consent to storage of your email. If you want your data removed, contact Jørgen on his email.
                </p>
                    <h2>Anonymous monitoring</h2>
                    <p>
                        Logrocket is used to track this application. It will monitor logs of application status and user logs.
                        Allowing this will be extremely helpful towards error handling and finding bugs!
                </p>
                    <br />

                    <Checkbox
                        onChange={() => setConsent(!consent)}
                        checked={consent}
                        label="I allow storing of my email"
                    />
                    <Checkbox
                        onChange={() => setLogrocketConsent(!logrocketConsent)}
                        checked={logrocketConsent}
                        label="I allow anonymous Logrocket monitoring of my session"
                    />
                    <br />
                </div>
                <ConsentButton disabled={!consent} onClick={handleSetConsent}>Proceed to Login</ConsentButton>
            </StyledDialog>
        )
    }
}

export default React.memo(PromptConsent);

const StyledDialog = styled.dialog`
    background: white;
    position: absolute;
    top: 10%; left: 10%; right: 10%;
    color: black;
    padding: 2em;

    display: flex;
    flex-direction: column;
    justify-content: space-between;

    h1, p {
        margin-bottom: 1em;
    }

    p {
        font-size: 16px;
    }
`;

const ConsentButton = styled.button`
    width: 100%;
    padding: 1em;
    color: white;
    background: ${props => props.disabled ? props.theme.default.grayColor : props.theme.default.primaryColor}; 
`;