const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const leads = [];
const interactions = [];

const generateId = () => Math.random().toString(36).substr(2, 9);

app.post('/leads', (req, res) => {
    const { id, name, address, contactNumber, status, assignedKAM } = req.body;

    if (!name || !address || !contactNumber || !status || !assignedKAM) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    if (id) {
        const lead = leads.find(l => l.id === id);
        if (!lead) return res.status(404).json({ error: 'Lead not found.' });
        Object.assign(lead, { name, address, contactNumber, status, assignedKAM });
        return res.status(200).json({ message: 'Lead updated successfully.', lead });
    }

    const newLead = {
        id: generateId(),
        name,
        address,
        contactNumber,
        status,
        assignedKAM,
        contacts: []
    };
    leads.push(newLead);
    res.status(201).json({ message: 'Lead created successfully.', lead: newLead });
});

app.post('/leads/:id/contacts', (req, res) => {
    const { id } = req.params;
    const { name, role, phoneNumber, email } = req.body;

    if (!name || !role || !phoneNumber || !email) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    const lead = leads.find(l => l.id === id);
    if (!lead) return res.status(404).json({ error: 'Lead not found.' });

    const newContact = { id: generateId(), name, role, phoneNumber, email };
    lead.contacts.push(newContact);
    res.status(201).json({ message: 'Contact added successfully.', contact: newContact });
});

app.post('/interactions', (req, res) => {
    const { leadId, date, type, notes, followUpRequired } = req.body;

    if (!leadId || !date || !type || typeof followUpRequired === 'undefined') {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    const lead = leads.find(l => l.id === leadId);
    if (!lead) return res.status(404).json({ error: 'Lead not found.' });

    const newInteraction = { id: generateId(), leadId, date, type, notes, followUpRequired };
    interactions.push(newInteraction);
    res.status(201).json({ message: 'Interaction logged successfully.', interaction: newInteraction });
});

app.get('/leads/:id', (req, res) => {
    const { id } = req.params;

    const lead = leads.find(l => l.id === id);
    if (!lead) return res.status(404).json({ error: 'Lead not found.' });

    const leadInteractions = interactions.filter(i => i.leadId === id);
    res.status(200).json({ lead, interactions: leadInteractions });
});

app.get('/leads', (req, res) => {
    const { search } = req.query;

    const filteredLeads = search
        ? leads.filter(l => l.name.toLowerCase().includes(search.toLowerCase()) || l.address.toLowerCase().includes(search.toLowerCase()))
        : leads;

    res.status(200).json({ leads: filteredLeads });
});

app.get('/dashboard', (req, res) => {
    const today = new Date().toISOString().split('T')[0];

    const pendingCalls = interactions.filter(i => i.date === today && i.type === 'Call' && i.followUpRequired);
    const recentInteractions = interactions.slice(-5);

    res.status(200).json({
        allLeads: leads,
        pendingCalls,
        recentInteractions
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
