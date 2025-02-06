document.addEventListener('DOMContentLoaded', () => {
    fetch('/api/admin/stats')
      .then(res => res.json())
      .then(data => {
        const stats = document.getElementById('stats');
        stats.innerHTML = `
          <li class="collection-item">Active Users: ${data.activeUsers}</li>
          <li class="collection-item">Total Merchants: ${data.totalMerchants}</li>
        `;
  
        const commentsTable = document.getElementById('comments');
        data.comments.forEach(comment => {
          const row = `
            <tr>
              <td>${comment.userId.username}</td>
              <td>${comment.merchantId.name}</td>
              <td>${comment.commentText}</td>
            </tr>
          `;
          commentsTable.innerHTML += row;
        });
      })
      .catch(err => console.error('Error loading stats:', err));
  });
  
  // Ensure the DOM is fully loaded before attaching event listeners
  document.addEventListener("DOMContentLoaded", () => {
    const blockUserForm = document.getElementById("blockUserForm");
    const manageMerchantForm = document.getElementById("manageMerchantForm");
  
    if (blockUserForm) {
      blockUserForm.addEventListener("submit", (e) => {
        e.preventDefault(); // Stop page reload
  
        const userId = document.getElementById("userId").value;
        if (!userId) {
          M.toast({ html: "User ID cannot be empty.", classes: "red darken-1" });
          return;
        }
  
        fetch("/api/admin/block", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: userId, type: "user" }),
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.success) {
              M.toast({ html: data.message, classes: "green darken-1" });
            } else {
              M.toast({ html: data.message, classes: "red darken-1" });
            }
          })
          .catch((error) => {
            console.error(error);
            M.toast({ html: "Failed to block the user.", classes: "red darken-1" });
          });
  
        blockUserForm.reset();
      });
    }
  
    if (manageMerchantForm) {
      manageMerchantForm.addEventListener("submit", (e) => {
        e.preventDefault(); // Stop page reload
  
        const merchantId = document.getElementById("merchantId").value;
        if (!merchantId) {
          M.toast({ html: "Merchant ID cannot be empty.", classes: "red darken-1" });
          return;
        }
  
        fetch("/api/admin/manage", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: merchantId, type: "merchant" }),
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.success) {
              M.toast({ html: data.message, classes: "green darken-1" });
            } else {
              M.toast({ html: data.message, classes: "red darken-1" });
            }
          })
          .catch((error) => {
            console.error(error);
            M.toast({ html: "Failed to block the merchant.", classes: "red darken-1" });
          });
  
        manageMerchantForm.reset();
      });
    }
  });
  
  