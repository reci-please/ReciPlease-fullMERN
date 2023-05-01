import { useEffect, useState } from "react";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID";
import { useCookies } from "react-cookie";
import { SavedRecipes } from "./saved-recipes";
import { Container, Row, Col } from "react-grid-system";
import clock from '../components/img/clock.svg';


export const FullRecipe = () => {

    return (
        <div className="recipes">

<h1>Full Recipe</h1>
        </div>
    )

};