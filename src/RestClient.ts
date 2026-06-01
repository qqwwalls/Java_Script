class RestClient{
private static readonly _URL: string="http://localhost:3000/posts";
public static async getData():Promise<any>{
  const response= await fetch(RestClient._URL);
  const data= await response.json();
  return data;
}
public static async addData(post:object):Promise<any>{
  const response= await fetch(RestClient._URL,{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify(post)
  });
  const data= await response.json();
  return data;    
}
public static async deleteData(id: string | number):Promise<any>{
  const response = await fetch(`${RestClient._URL}/${id}`, {
    method: "DELETE"
  });
  return await response.json();
}
public static async updateData(id: string | number, post: object):Promise<any>{
  const response = await fetch(`${RestClient._URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(post)
  });
  return await response.json();
}
}
export default RestClient;