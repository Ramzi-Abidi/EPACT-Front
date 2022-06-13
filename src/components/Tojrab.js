import React from 'react';
//admin-product-form-container
const Tojrab = () => {
    return (
        <form style={{ padding: "2.3rem 3.5rem", zIndex: 10, overflow: "hidden", position: "relative", margin: "1rem 3rem" }}>
            <div className="container">
                <fieldset style={{margin:"2rem auto" ,width:"85%"}}> 
                    <legend>Legend</legend>
                    <div class="form-group">
                        <label for="exampleInputEmail1" class="form-label mt-4">Nom du produit</label>
                        <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Product name' />
                    </div>
                    <div class="form-group">
                        <label for="exampleInputPassword1" class="form-label mt-4">Prix du produit </label>
                        <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Prix" />
                    </div>

                    <div class="form-group">
                        <label for="formFile" class="form-label mt-4">Default file input example</label>
                        <input class="form-control" type="file" id="formFile" />
                    </div>
                            <button type="submit" class="btn btn-primary" >Submit</button> 
                </fieldset>
            </div>

        </form>

    )
}

export default Tojrab;