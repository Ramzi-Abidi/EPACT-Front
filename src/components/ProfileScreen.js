import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { detailsUser, updateUserProfile } from "../actions/productAction";
import { USER_UPDATE_PROFILE_RESET } from "../constants/productConstant";
import AnimatedPage from "./AnimatedPage";
import LoadingBox from "./LoadingBox";
import MessageBox from "./MessageBox";

export default function ProfileScreen() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
    const userDetails = useSelector((state) => state.userDetails);
    const { loading, error, user } = userDetails;

    const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
    const {
        success: successUpdate,
        error: errorUpdate,
        loading: loadingUpdate,
    } = userUpdateProfile;

    const dispatch = useDispatch();

    useEffect(() => {
        /* dispatch(detailsUser(userInfo._id)); */
        if (!user) {
            dispatch({ type: USER_UPDATE_PROFILE_RESET });
            dispatch(detailsUser(userInfo._id));
        } else {
            setName(user.name);
            setEmail(user.email);
        }
    }, [dispatch, userInfo._id, user]);

    const submitHandler = (e) => {
        e.preventDefault();
        // dispatch update profile
        if (password !== confirmPassword) {
            alert('Password and Confirm Password Are Not Matched');
        } else {
            dispatch(updateUserProfile({ userId: user._id, name, email, password }));
        }
    };

    return (

        <AnimatedPage>

        <div className="contact-form profile-form" onSubmit={submitHandler} style={{margin:"2rem auto",width:"60%",marginTop:"8rem"}}>

            <form autocomplete="on">
                <h3 className="title" style={{color:"#fff"}}>Profile</h3>

                {loading ? (
                    <LoadingBox></LoadingBox>
                ) : error ? (
                    <MessageBox variant="danger">Erreur lors de chargement des infos personnelles</MessageBox>
                ) : (
                    <>
                        <div>
                            {loadingUpdate && <LoadingBox></LoadingBox>}
                            {errorUpdate && (
                                <MessageBox variant="danger">Erreur lors du modification du compte </MessageBox>
                            )}
                            {successUpdate && (
                                <MessageBox>
                                    Profile Updated Successfully
                                </MessageBox>
                            )}

                            <div class="input-container">
                                <input
                                    id="name"
                                    type="text"
                                    placeholder="Nom d'utilisateur"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="input"

                                ></input>
                            </div>
                            <div class="input-container">
                                <input
                                    id="email"
                                    type="email"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="input"

                                ></input>
                            </div>

                            <div class="input-container">
                                <input
                                    id="password"
                                    type="password"
                                    placeholder="Mot de passe"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="input"

                                ></input>

                            </div>

                            <div class="input-container textarea">
                                <input
                                    id="confirmPassword"
                                    type="password"
                                    placeholder="Confirmer mot de passe"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="input"
                                ></input>
                            </div>
                                <div className="input-container" style={{display:"flex", flexFlow:"row-reverse"}}>

                            <button className="btn btn-outline-primary signup" type="submit" style={{marginRight:"3rem"}}>
                                Modifier
                            </button>
                                </div>
                        </div>
                    </>
                )}
            </form>
        </div>
        </AnimatedPage>

    )
}