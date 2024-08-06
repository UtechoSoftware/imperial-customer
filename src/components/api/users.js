import axios from "axios";
// get Users-----
export const getUsers = async (lastId,search="") => {
    try {
      const res = await axios.get(
        global.BASEURL + `api/users/all/${lastId}/${search}`,
    
        {
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": global.TOKEN,
          },
        }
      );
      return res?.data;
    } catch (error) {
      console.log(error, "error");
    }
  };
  // update Users-----
export const updateUsers = async (id,status) => {
    try {
      const res = await axios.put(
        global.BASEURL + `api/users/userUpdate/${id}`,
        {
status:status
        },
        {
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": global.TOKEN,
          },
        }
      );
      return res;
    } catch (error) {
      console.log(error, "error");
    }
  };
  // add role ----
  export const AssignRoles = async (data) => {
    try { 
      const res = await axios.post(
        global.BASEURL + `api/users/admin/create`,
          data,
        {
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": global.TOKEN,
          },
        }
      );
      return res;
    } catch (error) {
      console.log(error, "error");
    }
  };
    // edit role ----
    export const EditRoles = async (data,id) => {
      try { 
        const res = await axios.put(
          global.BASEURL + `api/users/userUpdate/${id}`,
            data,
          {
            headers: {
              "Content-Type": "application/json",
              "x-auth-token": global.TOKEN,
            },
          }
        );
        return res;
      } catch (error) {
        console.log(error, "error");
      }
    };
        // edit role ----
        export const EditPassword = async (data,id) => {
          try { 
            const res = await axios.put(
              global.BASEURL + `api/users/updatePassword/${id}`,
                data,
              {
                headers: {
                  "Content-Type": "application/json",
                  "x-auth-token": global.TOKEN,
                },
              }
            );
            return res;
          } catch (error) {
            console.log(error, "error");
          }
        };
              // del role ----
              export const del_Role = async (id) => {
                try { 
                  const res = await axios.delete(
                    global.BASEURL + `api/users/${id}`,
                    {
                      headers: {
                        "Content-Type": "application/json",
                        "x-auth-token": global.TOKEN,
                      },
                    }
                  );
                  return res;
                } catch (error) {
                  console.log(error, "error");
                }
              };