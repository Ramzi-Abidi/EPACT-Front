import React, { useEffect, useState } from 'react'
import LoadingBox from './LoadingBox';
import MessageBox from './MessageBox';
import { useHistory } from "react-router-dom";
import Item from "./Item";
import ProductsItem from './ProductsItem';

const Home = () => {
	/* const productList = useSelector((state) => state.productList); */

/* 	const { loading, error, products } = productList; */

	/* console.log(products) ; */
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState();
/* 	const dispatch = useDispatch(); */

	const history = useHistory();

	const handleClick = (ch) => {
		if (ch === "signup")
			history.push("/signup");
		else
			if (ch === "signin")
				history.push("/signin");
	}

	useEffect(() => {
		//dispatch(listProducts());
		fetch("http://102.219.178.49:5000/api/products")
			.then((res)=>{
				setLoading(true) ;
				return res.json() ;
			})
			.then((data)=>{
				setLoading(false) ;
				console.log(data) ;
				setProducts(data) ;
			})
			.catch((err)=>{
				setLoading(false) ;
				setError(err) ;
				console.log(err) ;
			})

	}, []);

	return (
		<>
			<section className='site-desc'>

				<article className='siteDesc-container'>
					<div className='overlay'>
					</div>
					<h2>Bienvenue Chez EPACT</h2>
					<div className='para-container'>
						<p className='p1'>
							EPACT est un projet de production d'aliments concentrés 100% tunisiens pour bétail à un prix abordable.
							L'idée du projet est née dans le cadre de la valorisation des travaux de recherche scientifique en incluant les produits locaux, les déchets verts et les sous-produits pour la production d'aliments concentrés locaux afin de réduire la dépendance vis-à-vis des pays producteurs de matières premières (maïs et soja).
						</p>
						<p>
							EPACT est un projet qui offre une infinité de solutions dont la plus importante est un prix adapté et raisonnable pour l'éleveur tunisien, puisque l'utilisation d’une matière première 100% tunisienne  provoque la diminution du prix de l'aliment concentré, ce qui engendre ainsi la diminution du prix du lait et de la viande.
							De plus, notre projet vise à améliorer la qualité et à étendre la durée de conservation du lait et de la viande. De plus, cela va encourager les jeunes éleveurs à investir dans le domaine de l'élevage..
						</p>
					</div>
					
				</article>

			</section>

			<div className="row center">

				<section section className='second-section'>
					<h3 className='underlined'>Nos produits</h3>
					{
						loading ? <LoadingBox />
							:
							error ? <MessageBox variant={"danger"}> {error} </MessageBox>
								:
								<ProductsItem products={products} setProducts={setProducts} />
					}

					{!products || products.length===0 && <MessageBox>Aucun produit pour le moment</MessageBox>}
				</section>
			</div>

			<section className='news'>
				<h3 className='underlined'> Les dernières actualités </h3>

				<Item />
			</section>
		</>
	)
}

export default Home;