function signPage(){
    return(
        <>
<div class="grid grid-cols-1 md:grid-cols-2 min-h-screen">
  <div class="bg-blue-600 text-white flex items-center justify-center p-8">
    <h1 class="text-3xl font-bold">Left Section</h1>
  </div>

  <div class="bg-gray-100 text-gray-900 flex items-center justify-center p-8">
    <h1 class="text-3xl font-bold">Right Section</h1>
  </div>
</div>
        </>
    );
}

export default signPage;