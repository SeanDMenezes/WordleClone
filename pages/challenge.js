import { useRouter } from "next/router";
import { useEffect } from "react";

// redux
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { setChallengeID } from "../src/redux/game/gameActions";
import { selectChallengeID } from "../src/redux/game/gameSelector";

// components
import Game from "../src/components/Game/game";

const Challenge = ({ challengeID, setChallengeID }) => {
    const router = useRouter();

    useEffect(() => {
        setChallengeID(router.query.challengeID);
    }, [router]);

    return <Game challengeID={challengeID} />;
};

const mapState = createStructuredSelector({
    challengeID: selectChallengeID,
});

const mapDispatch = (dispatch) => ({
    setChallengeID: (cID) => dispatch(setChallengeID(cID)),
});

export default connect(mapState, mapDispatch)(Challenge);
