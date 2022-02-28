import { useEffect } from "react";

// redux
import { connect } from "react-redux";
import { setChallengeID } from "../src/redux/game/gameActions";

// components
import Game from "../src/components/Game/game";

const Wordle = ({ setChallengeID }) => {
    useEffect(() => {
        setChallengeID(null);
    });

    return <Game challengeID={null} />;
};

const mapDispatch = (dispatch) => ({
    setChallengeID: (challengeID) => dispatch(setChallengeID(challengeID)),
});

export default connect(null, mapDispatch)(Wordle);
