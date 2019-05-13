<template>
    <div>
        <h2>Pie Chart of User-Revision Distributions</h2> 
        <chartjs-pie    
            v-bind:bind="true"
            v-bind:labels="labels"
            v-bind:datasets="datasets"
            v-bind:option="option"/>
            
    </div>
</template>

<script>
export default { 
    data() { 
        return { 
            labels: ["Apples", "Bananas", "Grapes"], 
            datasets: [
                { 
                    data: [10, 20, 30], 
                    backgroundColor: ["Red", "Yellow", "Purple"]
                }
            ], 
            option: { 
                title: { 
                    display: true, 
                    position: "bottom", 
                    text: "Fruits"
                }
            }
        };
    }
}; 
</script> 

<style scoped> 
</style> 
    

