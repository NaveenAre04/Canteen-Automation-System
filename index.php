<!DOCTYPE html>
<html>
<?php
require_once 'config.php';
$var = null;
?>

<head>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
   
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
    
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
    <script src="https://kit.fontawesome.com/2e4c9e68b5.js" crossorigin="anonymous"></script>
    <script src="actions.js"></script>
    <title>Page Title</title>
</head>

<body class='p-1' style="text-align: -webkit-right;">    
    <button class='alertClose' hidden=true>click</button>
    <div class="container mt-5">
        <table class="table table-striped">
            <thead>
                <tr>                    
                    <td colspan="4"><h5 style="text-align:left;" class="mb-3">List of all Persons</h5></td>
                    <td colspan="2"><input class="form-control" id="mySearch" type="text" placeholder="Search.."></td>
                </tr>
                <tr>
                    <th scope="col">PersonId</th>
                    <th scope="col">firstname</th>
                    <th scope="col">lastname</th>
                    <th scope="col">gender</th>
                    <th scope="col">age</th>
                    <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody id="myData">
                <?php
                $sql = "SELECT * FROM persons";
                if($result = mysqli_query($link, $sql)){
                    if(mysqli_num_rows($result) > 0){
                        while($row = mysqli_fetch_array($result)){
                ?>
                <tr>
                    <th scope="row"><?php echo $row['person_id'] ?></th>
                    <td><?php echo $row['firstname'] ?></td>
                    <td><?php echo $row['lastname'] ?></td>
                    <td><?php echo $row['gender'] ?></td>
                    <td><?php echo $row['age'] ?></td>
                    <td><i class="fas fa-edit mr-3 personUpdateCl"
                    id=<?php echo "person-".$row['person_id']."-".$row['firstname']."-".$row['lastname']."-".$row['gender']."-".$row['age']; ?>
                    style="cursor:pointer"></i>
                     <i style="cursor:pointer"
                       id=<?php echo $row['person_id']; ?>
                       class="fas fa-trash-alt personsdelete"></i>
                    </td>
                </tr>
                <?php
                        }
                    }
                }
                ?>
                <tr>
                    <td colspan="6" id="persons" style="text-align:center;background-color:#b1e1a1;cursor:pointer" 
                    data-target="#exampleModal">Add New Record
                        &nbsp;<i class="fas fa-plus-circle"></i></td>
                </tr>
            </tbody>
        </table>
    </div>
    <div class="container-fluid mt-3 pt-5">
        <div class="row">
            <div class="col-sm-7">
                <table class="table table-striped">
                    <thead>
                    <tr>
                        <td colspan="2"><h5 style="text-align:left;" class="mb-3">List of all Addresses</h5></td>
                        <td colspan="2"><input class="form-control" id="mySearch1" type="text" placeholder="Search.."></td>    
                    </tr>
                        <tr>
                            <th scope="col">address_id</th>
                            <th scope="col">address</th>
                            <th scope="col">person_id</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody id="myData1">
                        <?php
                    $sql = "SELECT * FROM address";
                if($result = mysqli_query($link, $sql)){
                    if(mysqli_num_rows($result) > 0){
                        while($row = mysqli_fetch_array($result)){
                        ?>
                        <tr>
                            <th scope="row"><?php echo $row['address_id'] ?></th>
                            <td><?php echo $row['address'] ?></td>
                            <td><?php echo $row['person_id'] ?></td>
                            <td><i class="fas fa-edit mr-3 addressUpdateCi"
                            id=<?php echo "address-".$row['address_id']."-".$row['address']."-".$row['person_id']; ?> 
                            style="cursor:pointer"></i>
                            <i class="fas fa-trash-alt addressdelete"
                            id=<?php echo $row['address_id']; ?>
                                    style="cursor:pointer"></i></td>
                        </tr>

                        <?php
                        }
                    }
                }
            ?>
                        <tr>
                            <td colspan="4" id="addresses" style="text-align:center;background-color:#b1e1a1;cursor:pointer">Add New
                                Record &nbsp;<i class="fas fa-plus-circle"></i></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="col-sm-5">
                <table class="table table-striped">
                    <thead>
                    <tr>
                    <td colspan="3"><h5 style="text-align:left;" class="mb-3">List of all Orders</h5></td>
                    <td colspan="2"><input class="form-control" id="mySearch2" type="text" placeholder="Search.."></td>    
                    </tr>
                        <tr>
                            <th scope="col">order_id</th>
                            <th scope="col">order_number</th>
                            <th scope="col">person_id</th>
                            <th scope="col">address_id</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody id="myData2">
                        <?php
                $sql = "SELECT * FROM orders";
                if($result = mysqli_query($link, $sql)){
                    if(mysqli_num_rows($result) > 0){
                        while($row = mysqli_fetch_array($result)){
            ?>
                        <tr>
                            <th scope="row"><?php echo $row['order_id'] ?></th>
                            <td><?php echo $row['order_number'] ?></td>
                            <td><?php echo $row['person_id'] ?></td>
                            <td><?php echo $row['address_id'] ?></td>
                            <td><i class="fas fa-edit mr-3 orderUpdateCi"
                            id=<?php echo "orders-".$row['order_id'].'-'.$row['order_number'].'-'.$row['person_id'].'-'.$row['address_id']; ?> 
                            style="cursor:pointer"></i><i 
                            class="fas fa-trash-alt ordersdelete"
                            id=<?php echo $row['order_id']; ?>
                                    style="cursor:pointer"></i></td>
                        </tr>
                        <?php
                        }
                    }
                }

            ?>
                        <tr>
                            <td colspan="5" id="orders" style="text-align:center;background-color:#b1e1a1;cursor:pointer">Add New
                                Record &nbsp;<i class="fas fa-plus-circle"></i></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    <div class="container mt-5 mb-5">
        <table class="table table-striped">
            <thead>
            <tr colspan="3">
                    <h5 style="text-align:center;" class="mb-3">Total Orders Placed By Each Individual</h5>
                </tr>
                <tr>
                    <th scope="col">PersonId</th>
                    <th scope="col">Firstname</th>
                    <th scope="col">Total orders</th>
                </tr>
            </thead>
            <tbody>
                <?php
                $sql = "select p.person_id,p.firstname,count(*) as counts from orders o LEFT JOIN persons p on o.person_id = p.person_id group by o.person_id;";
                if($result = mysqli_query($link, $sql)){
                    if(mysqli_num_rows($result) > 0){
                        while($row = mysqli_fetch_array($result)){
                ?>
                <tr>
                    <th scope="row"><?php echo $row['person_id'] ?></th>
                    <td><?php echo $row['firstname'] ?></td>
                    <td><?php echo $row['counts'] ?></td>
                    
                </tr>
                <?php
                        }
                    }
                }
                ?>
            </tbody>
        </table>
    </div>

    <div class="container mt-5 mb-5">
        <table class="table table-striped">
            <thead>
                <tr colspan="7">
                    <h5 style="text-align:center;" class="mb-3">Address Left Join with Persons</h5>
                </tr>
                <tr>
                    <th scope="col">Address_id</th>
                    <th scope="col">Address</th>
                    <th scope="col">PersonId</th>
                    <th scope="col">Firstname</th>
                    <th scope="col">lastname</th>
                    <th scope="col">Gender</th>
                    <th scope="col">Age</th>
                </tr>
            </thead>
            <tbody>
                <?php
                $sql = "select a.address_id,a.address,p.* from address a LEFT JOIN persons p on a.person_id = p.person_id ";
                if($result = mysqli_query($link, $sql)){
                    if(mysqli_num_rows($result) > 0){
                        while($row = mysqli_fetch_array($result)){
                ?>
                <tr>
                    <th scope="row"><?php echo $row['address_id'] ?></th>
                    <td><?php echo $row['address'] ?></td>
                    <td><?php echo $row['person_id'] ?></td>                    
                    <th scope="row"><?php echo $row['firstname'] ?></th>
                    <td><?php echo $row['lastname'] ?></td>
                    <td><?php echo $row['gender'] ?></td>
                    <td><?php echo $row['age'] ?></td>                    
                </tr>
                <?php
                        }
                    }
                }
                ?>
            </tbody>
        </table>
    </div>
    <button type="button" id="personsButton" hidden=true class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
        Launch demo modal
    </button>
    <button type="button" id="addressButton" hidden=true class="btn btn-primary" data-toggle="modal" data-target="#exampleModal1">
        Launch demo modal
    </button>
    <button type="button" id="ordersButton" hidden=true class="btn btn-primary" data-toggle="modal" data-target="#exampleModal2">
        Launch demo modal
    </button>
    <button type="button" id="personUpdate" hidden=true class="btn btn-primary" data-toggle="modal" data-target="#exampleModal3">
        Launch demo modal
    </button>
    <button type="button" id="addressUpdate" hidden=true class="btn btn-primary" data-toggle="modal" data-target="#exampleModal4">
        Launch demo modal
    </button>
    <button type="button" id="orderUpdate" hidden=true class="btn btn-primary" data-toggle="modal" data-target="#exampleModal5">
        Launch demo modal
    </button>

    <!-- Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Add Person Record</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>                
                <form action="persons_insert.php" method="post">
                <div class="modal-body">
                        <input type="text" required class="form-control mb-1" placeholder="firstname" name="firstname">
                        <input type="text" required class="form-control mb-1" placeholder="lastname" name="lastname">
                        <input type="text" required class="form-control mb-1" placeholder="gender" name="gender">
                        <input type="text" required class="form-control mb-1" placeholder="age" name="age">
                
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="submit" class="btn btn-primary">Save changes</button>
                </div>
                </form>
            </div>
        </div>
    </div>
    <div class="modal fade" id="exampleModal1" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Add Address Record</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>                
                <form action="address_insert.php" method="post">
                <div class="modal-body">
                        <input type="text" required class="form-control mb-1" placeholder="address" name="address">
                        <input type="text" required class="form-control mb-1" placeholder="person_id" name="person_id">
                
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="submit" class="btn btn-primary">Save changes</button>
                </div>
                </form>
            </div>
        </div>
    </div>
    <div class="modal fade" id="exampleModal2" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Add Order Record</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>                
                <form action="orders_inserted.php" method="post">
                <div class="modal-body">
                        <input type="text" required class="form-control mb-1" placeholder="order_number" name="order_number">
                        <input type="text" required class="form-control mb-1" placeholder="person_id" name="person_id">
                        <input type="text" required class="form-control mb-1" placeholder="address_id" name="address_id">
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="submit" class="btn btn-primary">Save changes</button>
                </div>
                </form>
            </div>
        </div>
    </div>
    <div class="modal fade" id="exampleModal3" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Edit Record</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <?php echo $var; ?>                
                <form action="persons_update.php" method="post">
                <div class="modal-body">
                        <input id="ppersonid" class="form-control mb-1" readonly type="text" name="person_id"/>
                        <input id="pfirstname" type="text" required class="form-control mb-1" placeholder="firstname" name="firstname">
                        <input id="plastname" type="text" required class="form-control mb-1" placeholder="lastname" name="lastname">
                        <input id="pgender" type="text" required class="form-control mb-1" placeholder="gender" name="gender">
                        <input id="page" type="text" required class="form-control mb-1" placeholder="age" name="age">
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="submit" class="btn btn-primary">Save changes</button>
                </div>
                </form>
            </div>
        </div>
    </div>
    <div class="modal fade" id="exampleModal4" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Add Address Record</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>                
                <form action="address_update.php" method="post">
                <div class="modal-body">
                        <input id="paddressid"  readonly type="text" required class="form-control mb-1" placeholder="address" name="address">
                        <input id="paddress" type="text" required class="form-control mb-1" placeholder="address" name="address">
                        <input id="papersonid" type="text" required class="form-control mb-1" placeholder="person_id" name="person_id">
                
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="submit" class="btn btn-primary">Save changes</button>
                </div>
                </form>
            </div>
        </div>
    </div>
    <div class="modal fade" id="exampleModal5" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Add Address Record</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>                
                <form action="orders_updated.php" method="post">
                <div class="modal-body">
                        <input type="text" id="porderid" required class="form-control mb-1" placeholder="order_id" name="order_id">
                        <input id="pordernumber" type="text" required class="form-control mb-1" placeholder="order_number" name="order_number">
                        <input id="popersonid" type="text" required class="form-control mb-1" placeholder="person_id" name="person_id">
                        <input id="poaddressid" type="text" required class="form-control mb-1" placeholder="address_id" name="address_id">
                
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="submit" class="btn btn-primary">Save changes</button>
                </div>
                </form>
            </div>
        </div>
    </div>
</body>
</html>
